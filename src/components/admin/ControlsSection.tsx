import { NotebookPen, Trash2 } from "lucide-react";

export default function ControlsSection({ control }: { control: string }) {
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

    </section>
  );
}