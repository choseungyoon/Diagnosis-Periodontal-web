import { useEffect, useState } from "react";
import { Img } from "./Img";

interface LibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedLibrary: string | null) => void;
  initialTitle?: string;
}

interface Library {
  id: number;
  title: string;
}

export default function LibraryModal({
  isOpen,
  onClose,
  onSave,
  initialTitle = "Default",
}: LibraryModalProps) {
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [selectedLibrary, setSelectedLibrary] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newLibraryTitle, setNewLibraryTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (selectedLibrary == null) {
        setSelectedLibrary(initialTitle);
      }

      const fetchLibraries = async () => {
        try {
          const response = await fetch("/api/getLibrary");
          if (response.ok) {
            const data = await response.json();
            setLibraries(data.libraries);
          }
        } catch (error) {
          console.error("Failed to fetch libraries", error);
        }
      };
      fetchLibraries();
    }
  }, [isOpen, initialTitle, isAddingNew]);

  const handleLibrarySelect = (title: string) => {
    setSelectedLibrary(title);
  };

  const handleNewLibraryAdd = async () => {
    if (newLibraryTitle.trim().length > 15) {
      setErrorMessage("Library title must be 15 characters or less.");
      return;
    }
    if (libraries.some((library) => library.title === newLibraryTitle.trim())) {
      setErrorMessage("Library title already exists.");
      return;
    }
    if (libraries.length >= 10) {
      setErrorMessage("Maximum of 10 libraries allowed.");
      return;
    }

    if (newLibraryTitle.trim()) {
      try {
        const response = await fetch("/api/addLibrary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: newLibraryTitle }),
        });
        if (response.ok) {
          const data = await response.json();
          setLibraries((prevLibraries) => [
            ...prevLibraries,
            { title: data.title, id: data.id },
          ]);
          setNewLibraryTitle("");
          setIsAddingNew(false);
          console.log(libraries);
        }
      } catch (error) {
        console.error("Failed to add library", error);
      }
    }
  };

  const handleSave = () => {
    if (selectedLibrary == null || selectedLibrary === "") {
      alert("Select library");
      return;
    }
    onSave(selectedLibrary); // Save 버튼 클릭 시 선택된 라이브러리를 반환
    onClose();
  };

  const handleLibraryDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/deleteLibrary?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setLibraries(libraries.filter((library) => library.id !== id));
        if (
          selectedLibrary &&
          selectedLibrary === libraries.find((lib) => lib.id === id)?.title
        ) {
          setSelectedLibrary(null);
        }
      }
    } catch (error) {
      console.error("Failed to delete library", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-full">
      <div className="bg-white-a700 border-2 border-gray-100 py-10 px-5 rounded-lg shadow-lg max-w-lg w-full animate-modal-open flex flex-col gap-2">
        <div className="flex justify-between mb-4">
          <span className="text-xl font-bold">Select Library</span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <hr className="mb-4" />

        <p className="text-md text-slate-600 mb-4">
          Select library you want to save result:
        </p>

        <ul className="space-y-2 mb-4">
          {libraries != null &&
            libraries.map((library, index) => (
              <li
                key={index}
                className={`py-2 px-4 rounded-md border border-gray-100 ${
                  selectedLibrary === library.title
                    ? "bg-gray-300"
                    : "hover:bg-gray-100"
                } cursor-pointer`}
                onClick={() => handleLibrarySelect(library.title)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">{library.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLibraryDelete(library.id);
                    }}
                    className="text-gray-500 hover:text-red-600"
                  >
                    <Img src="img_close.png" width={24} height={24}></Img>
                  </button>
                </div>
              </li>
            ))}
          <li className="pt-5">
            <button
              onClick={() => setIsAddingNew(true)}
              className="w-full py-2 rounded-md border border-gray-100 text-center hover:bg-gray-100"
            >
              + New library
            </button>
          </li>
        </ul>

        {isAddingNew && (
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newLibraryTitle}
              onChange={(e) => setNewLibraryTitle(e.target.value)}
              placeholder="Enter library name"
              className="border p-2 rounded-md w-full"
            />
            <button
              onClick={handleNewLibraryAdd}
              className="bg-blue-500 text-white px-4 rounded-md"
            >
              Add
            </button>
          </div>
        )}

        <div className="flex justify-between gap-3 mt-6">
          <button
            type="button"
            className="w-1/2 py-3 border-gray-300 border hover:bg-gray-100 rounded-md bg-white-a700 text-gray-800"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="w-1/2 py-3 rounded-md text-white-a700  bg-[#0081BF] hover:bg-[#8dc8e3] text-white"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
