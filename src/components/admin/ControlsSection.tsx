import { NotebookPen, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import Modal from "../modal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useGallery from "../../hooks/useGallery";
import useFeed from "../../hooks/useFeed";

export default function ControlsSection({ control }: { control: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const { handleGetGallery, handleSubmit, handleFileChange } = useGallery();
  const { handleDescriptionChange, handleTitleChange, handleAddFeed, handleImagesChange, handleGetFeed, resetForm, title: feedTitle, description: feedDescription } = useFeed();
  const queryClient = useQueryClient();

  const {data, isLoading} = useQuery({
    queryKey: control === "Albums" ? ["albums"] : ["feed"],
    queryFn: control === "Albums" ? handleGetGallery : handleGetFeed
  });

  const items = Array.isArray(data) ? data.filter(item => item != null) : [];

  const galleryMutation = useMutation({
    mutationFn: (variables: { e: React.FormEvent<HTMLFormElement>; title: string }) => 
      handleSubmit(variables.e, variables.title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      setIsOpen(false);
      setTitle("");
    },
  });

  const feedMutation = useMutation({
    mutationFn: () => handleAddFeed(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      resetForm();
      setIsOpen(false);
      setTitle("");
    },
  });

  const handleFeedSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    feedMutation.mutate();
  };

  const handleGallerySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    galleryMutation.mutate({ e, title });
  };


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
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-text/60">Loading...</td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-text/60">No {control.toLowerCase()} found</td>
                </tr>
              ) : items.map((item, index) => (
                <tr
                  key={index}
                  className="odd:bg-secondary/20 even:bg-primary/20 font-medium text-sm sm:text-md text-text hover:bg-primary/40 transition-colors duration-200"
                >
                  <td className="px-2 sm:px-5 py-2 sm:py-3 text-center whitespace-nowrap">{index + 1}</td>
                  <td className="px-2 sm:px-5 py-2 sm:py-3 max-w-[200px] sm:max-w-none truncate sm:whitespace-normal">{item.title || 'Untitled'}</td>
                  <td className="px-2 sm:px-5 py-2 sm:py-3 text-center whitespace-nowrap hidden md:table-cell">{item.images?.length || 0}</td>
                  <td className="px-2 sm:px-5 py-2 sm:py-3 text-center whitespace-nowrap hidden lg:table-cell">Admin</td>
                  <td className="px-2 sm:px-5 py-2 sm:py-3">
                    <div className="flex gap-2 sm:gap-4 items-center justify-center">
                      <button
                        aria-label={`Edit feed ${item.title}`}
                        className="text-accent hover:text-accent/80 transition-colors duration-200"
                      >
                        <NotebookPen size={18} className="sm:w-5 sm:h-5" />
                      </button>
                      <button
                        aria-label={`Delete feed ${item.title}`}
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
          <div className="bg-primary/30 backdrop-blur-md text-white w-full h-full rounded-lg py-6 sm:py-10 px-4 sm:px-10">
            <div className="title text-center border-b-2 border-accent/50 pb-4 mb-6">
              <h1 className="text-2xl sm:text-3xl font-body font-bold">
                Create <span className="text-accent">{control}</span>
              </h1>
            </div>
            <form onSubmit={control === "Albums" ? handleGallerySubmit : handleFeedSubmit} className="space-y-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-sm font-semibold text-text uppercase tracking-wide">
                  Title <span className="text-red-400">*</span>
                </label>
                <input 
                  id="title"
                  type="text" 
                  placeholder="Enter title..." 
                  value={control === "Albums" ? title : feedTitle}
                  onChange={(e) => control === "Albums" ? setTitle(e.target.value) : handleTitleChange(e.target.value)}
                  required
                  className="w-full bg-secondary/50 border-2 border-primary/40 rounded-lg px-4 py-3 text-text placeholder-text/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="file" className="text-sm font-semibold text-text uppercase tracking-wide">
                  Upload Images <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input 
                    id="file"
                    type="file" 
                    key={isOpen ? "file-input-open" : "file-input-closed"}
                    onChange={control === "Albums" ? handleFileChange : handleImagesChange}
                    required
                    multiple
                    accept="image/*"
                    className="w-full bg-secondary/50 border-2 border-primary/40 border-dashed rounded-lg px-4 py-8 text-text file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-primary hover:file:bg-accent/80 file:cursor-pointer cursor-pointer focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
                  />
                  <p className="text-xs text-text/60 mt-2">Supports: JPG, PNG, GIF, WebP (Multiple files allowed)</p>
                </div>
              </div>
              {control === "Feed" && (
              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-sm font-semibold text-text uppercase tracking-wide">
                  description <span className="text-red-400">*</span>
                </label>
                <textarea 
                  id="description"
                  placeholder="Enter description..."
                  value={feedDescription}
                  onChange={(e) => handleDescriptionChange(e.target.value)}
                  required
                  className="w-full bg-secondary/50 border-2 border-primary/40 rounded-lg px-4 py-3 text-text placeholder-text/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
                />
              </div>
              )}

              <div className="flex gap-3 pt-4">
                <button 
                  type="submit"
                  disabled={(control === "Albums" ? galleryMutation.isPending : feedMutation.isPending)}
                  className="flex-1 bg-accent text-primary font-semibold py-3 px-6 rounded-lg hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-accent shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {(control === "Albums" ? galleryMutation.isPending : feedMutation.isPending) ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </span>
                  ) : (
                    `Create ${control}`
                  )}
                </button>
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={control === "Albums" ? galleryMutation.isPending : feedMutation.isPending}
                  className="px-6 py-3 bg-transparent border-2 border-text/30 text-text font-semibold rounded-lg hover:bg-text/10 focus:outline-none focus:ring-2 focus:ring-text/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
              {(control === "Albums" ? galleryMutation.isError : feedMutation.isError) && (
                <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <p className="text-red-200 text-sm">
                    Failed to create {control}. Please try again.
                  </p>
                </div>
              )}
            </form>
          </div>
        </Modal>}

    </section>
  );
}