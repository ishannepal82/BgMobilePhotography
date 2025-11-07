import { NotebookPen, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import Modal from "../modal";

export default function ControlsSection({ control }: { control: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const data = [
    { id: 1, caption: "Morning vibes 🌅☕️ Ready to take on the day!", no_of_images: 2, author: "Alice" },
    { id: 2, caption: "Can't believe this view 😍 #wanderlust", no_of_images: 4, author: "Bob" },
    { id: 3, caption: "Sunday brunch with my favorite people 🥞🥂", no_of_images: 3, author: "Charlie" },
    { id: 4, caption: "New art piece finally finished! 🎨✨", no_of_images: 1, author: "Diana" },
    { id: 5, caption: "When in doubt, go for a walk 🚶‍♂️🌳", no_of_images: 2, author: "Ethan" },
    { id: 6, caption: "Throwback to the best concert ever 🎶🔥", no_of_images: 5, author: "Fiona" },
    { id: 7, caption: "Rainy days and cozy sweaters ☔🧣", no_of_images: 2, author: "George" },
    { id: 8, caption: "My cat literally owns this couch 😹", no_of_images: 3, author: "Hannah" },
    { id: 9, caption: "Weekend getaway success 🏖️🌺", no_of_images: 4, author: "Isaac" },
    { id: 10, caption: "Homemade pizza night 🍕👨‍🍳", no_of_images: 2, author: "Julia" },
  ];

  return (
    <section className="font-body px-2 sm:px-4" aria-label="Control and management feeds table">
      <div className="top flex flex-col items-center justify-center mb-4 sm:mb-6 w-full">
        <h1 className="text-xl sm:text-2xl font-semibold text-text mb-1 text-center">Control, Observe and Manage</h1>
          <span className="text-accent text-xl sm:text-2xl font-medium">{control}</span>
      </div>
      <div className="flex justify-end items-center p-2">
        <button className="text-text bg-accent flex gap-2 p-2 flex-reverse rounded-md shadow-md hover:scale-105 transition-all duration-300 hover:bg-text hover:text-accent" onClick={() => setIsOpen(true)}>
          <span>Create {control}</span>
          <Plus size={20} />
        </button>
      </div>
      <div className="border-b-2 border-primary/30 mb-4 sm:mb-6"></div>
        <div className="flex items-center justify-center">
          <div className="-mx-2 w-full overflow-x-auto"> 
          <div className="inline-block min-w-full align-middle ">
          <table className="min-w-full border-collapse text-text overflow-x-auto">
            <thead className="bg-secondary text-sm sm:text-lg font-semibold">
              <tr>
                <th scope="col" className="border border-primary/30 px-2 sm:px-5 py-2 sm:py-3 text-center whitespace-nowrap">ID</th>
                <th scope="col" className="border border-primary/30 px-2 sm:px-5 py-2 sm:py-3 text-left">Caption</th>
                <th scope="col" className="border border-primary/30 px-2 sm:px-5 py-2 sm:py-3 text-center whitespace-nowrap hidden md:table-cell">Images</th>
                <th scope="col" className="border border-primary/30 px-2 sm:px-5 py-2 sm:py-3 text-center whitespace-nowrap hidden lg:table-cell">Author</th>
                <th scope="col" className="border border-primary/30 px-2 sm:px-5 py-2 sm:py-3 text-center whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-primary/30">
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="odd:bg-secondary/20 even:bg-primary/20 font-medium text-sm sm:text-md text-text hover:bg-primary/40 transition-colors duration-200"
                >
                  <td className="px-2 sm:px-5 py-2 sm:py-3 text-center whitespace-nowrap">{item.id}</td>
                  <td className="px-2 sm:px-5 py-2 sm:py-3 max-w-[200px] sm:max-w-none truncate sm:whitespace-normal">{item.caption}</td>
                  <td className="px-2 sm:px-5 py-2 sm:py-3 text-center whitespace-nowrap hidden md:table-cell">{item.no_of_images}</td>
                  <td className="px-2 sm:px-5 py-2 sm:py-3 text-center whitespace-nowrap hidden lg:table-cell">{item.author}</td>
                  <td className="px-2 sm:px-5 py-2 sm:py-3">
                    <div className="flex gap-2 sm:gap-4 items-center justify-center">
                      <button
                        aria-label={`Edit feed with ID ${item.id}`}
                        className="text-accent hover:text-accent/80 transition-colors duration-200"
                      >
                        <NotebookPen size={18} className="sm:w-5 sm:h-5" />
                      </button>
                      <button
                        aria-label={`Delete feed with ID ${item.id}`}
                        className="text-red-600 hover:bg-red-200 rounded-md p-1 transition-colors duration-200"
                      >
                        <Trash2 size={18} className="sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
        </div>
        {isOpen && <Modal onClose={() => setIsOpen(false)}>
          <div className="bg-primary/30 backdrop-blur-md text-white w-full h-full rounded-md py-10 sm:p-10 p-2">
            <div className="title text-center border-b-2 border-primary/30">
              <h1 className="text-xl font-body font-semibold">Create <span className="text-accent">{control}</span></h1>
            </div>
            <form className="flex flex-col gap-2 m-4 w-full mx-auto">
              <label className="block mb-2 text-sm text-text/80">Gallery Title</label>
              <input 
              type="text" 
              placeholder="Gallery Title" className="bg-primary/20 rounded-md p-2 text-white" />
              <div className="mt-2">
                <label className="block mb-2 text-sm text-text/80">Upload images</label>
                <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-primary/40 rounded-md p-6 cursor-pointer hover:border-accent/60 transition-colors bg-primary/10">
                  <span className="text-sm text-text/80">Click to select or drag and drop</span>
                  <span className="text-xs text-text/60">PNG, JPG up to ~10MB each</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
                  />
                </label>
                <div className="text-xs text-text/70 mt-2">
                  {files.length > 0 ? `${files.length} file(s) selected` : "No files selected"}
                </div>
              </div>
              
              <button type="submit" className="text-text bg-accent hover:bg-text p-2 rounded-md hover:text-accent transition-colors duration-200 my-2">Create Gallery</button>
            </form>
          </div>
        </Modal>}

    </section>
  );
}