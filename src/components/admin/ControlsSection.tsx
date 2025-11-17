import { NotebookPen, Plus, Trash2, Grid3x3, List, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";
import Modal from "../modal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useGallery from "../../hooks/useGallery";
import useFeed from "../../hooks/useFeed";
import useContacts from "../../hooks/useContacts";

type ViewMode = "table" | "card";

export default function ControlsSection({ control }: { control: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  const { 
    handleGetGallery, 
    handleSubmit, 
    handleFileChange
  } = useGallery();

  const { 
    handleDescriptionChange,
    handleTitleChange, 
    handleAddFeed, 
    handleImagesChange, 
    handleGetFeed, 
    resetForm,
    title: feedTitle, 
    description: feedDescription
  } = useFeed();
  
  const {
    handleEmailChange,
    handleMessageChange,
    handleContactsFetch,
  } = useContacts();

  const queryClient = useQueryClient();
  
  const {data, isLoading} = useQuery({
    queryKey: control === "Albums" ? ["albums"] : control === "Feed" ? ["feed"] : ["contacts"],
    queryFn: control === "Albums" ? handleGetGallery : control === "Feed" ? handleGetFeed : handleContactsFetch
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
  
  const getCurrentMutation = () => {
    if (control === "Albums") return galleryMutation;
    if (control === "Feed") return feedMutation;
  };

  const currentMutation = getCurrentMutation();

  // Card Components
  const AlbumCard = ({ item, index }: { item: any; index: number }) => (
    <div className="bg-secondary/20 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-primary/30">
      <div className="h-48 bg-primary/20 flex items-center justify-center overflow-hidden">
        {item.images && item.images.length > 0 ? (
          <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-text/30">
            <Grid3x3 size={64} />
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-text truncate mb-1">{item.title || 'Untitled'}</h3>
            <p className="text-sm text-text/60">ID: {index + 1}</p>
          </div>
          <div className="flex gap-2">
            <button
              aria-label={`Edit album ${item.title}`}
              className="text-accent hover:text-accent/80 transition-colors duration-200"
            >
              <NotebookPen size={18} />
            </button>
            <button
              aria-label={`Delete album ${item.title}`}
              className="text-red-600 hover:bg-red-200 rounded-md p-1 transition-colors duration-200"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-text/70 flex items-center gap-1">
            <Grid3x3 size={16} />
            {item.images?.length || 0} images
          </span>
          <span className="text-text/70">Admin</span>
        </div>
      </div>
    </div>
  );

  const FeedCard = ({ item, index }: { item: any; index: number }) => (
    <div className="bg-secondary/20 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-primary/30">
      <div className="h-48 bg-primary/20 flex items-center justify-center overflow-hidden">
        {item.images && item.images.length > 0 ? (
          <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-text/30">
            <MessageSquare size={64} />
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-text truncate mb-1 text-wrap">{item.title || 'Untitled'}</h3>
            <p className="text-sm text-text/60 line-clamp-2 mb-2 w-1/2">{item.description || 'No description'}</p>
            <p className="text-xs text-text/50">ID: {index + 1}</p>
          </div>
          <div className="flex gap-2">
            <button
              aria-label={`Edit feed ${item.title}`}
              className="text-accent hover:text-accent/80 transition-colors duration-200"
            >
              <NotebookPen size={18} />
            </button>
            <button
              aria-label={`Delete feed ${item.title}`}
              className="text-red-600 hover:bg-red-200 rounded-md p-1 transition-colors duration-200"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm pt-3 border-t border-primary/30">
          <span className="text-text/70 flex items-center gap-1">
            <Grid3x3 size={16} />
            {item.images?.length || 0} images
          </span>
          <span className="text-text/70">Admin</span>
        </div>
      </div>
    </div>
  );

  const ContactCard = ({ item, index }: { item: any; index: number }) => (
    <div className="bg-secondary/20 rounded-lg p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-primary/30">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
              <Mail size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-text">{item.email || 'No email'}</h3>
              <p className="text-xs text-text/50">ID: {index + 1}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            aria-label={`View contact ${item.email}`}
            className="text-accent hover:text-accent/80 transition-colors duration-200"
          >
            <NotebookPen size={18} />
          </button>
          <button
            aria-label={`Delete contact ${item.email}`}
            className="text-red-600 hover:bg-red-200 rounded-md p-1 transition-colors duration-200"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <div className="bg-primary/30 rounded-md p-3">
        <p className="text-sm text-text/80 line-clamp-3">{item.message || 'No message'}</p>
      </div>
      <div className="mt-3 flex justify-between items-center text-xs text-text/60">
        <span>Admin</span>
        <span>{new Date(item.createdAt || Date.now()).toLocaleDateString()}</span>
      </div>
    </div>
  );

  return (
    <section className="font-body px-2 sm:px-4" aria-label="Control and management section">
      {/* Header */}
      <div className="top flex flex-col items-center justify-center mb-4 sm:mb-6 w-full">
        <h1 className="text-xl sm:text-2xl font-semibold text-text mb-1 text-center">
          Control, Observe and Manage
        </h1>
        <span className="text-accent text-xl sm:text-2xl font-medium">{control}</span>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4 p-2">
        <div className="flex gap-2 order-2 sm:order-1">
          <button
            onClick={() => setViewMode("table")}
            className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-all duration-200 ${
              viewMode === "table"
                ? "bg-accent text-primary"
                : "bg-secondary/50 text-text hover:bg-secondary"
            }`}
          >
            <List size={18} />
            <span className="hidden sm:inline">Table</span>
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-all duration-200 ${
              viewMode === "card"
                ? "bg-accent text-primary"
                : "bg-secondary/50 text-text hover:bg-secondary"
            }`}
          >
            <Grid3x3 size={18} />
            <span className="hidden sm:inline">Cards</span>
          </button>
        </div>
        
        { control !== "Contacts" && (
          <button
            className="text-text bg-accent flex items-center gap-2 p-2 rounded-md shadow-md hover:scale-105 transition-all duration-300 hover:bg-text hover:text-accent order-1 sm:order-2 w-full sm:w-auto justify-center"
            onClick={() => setIsOpen(true)}
          >
            <span>Create {control}</span>
            <Plus size={20} />
          </button>
        )}

      </div>

      <div className="border-b-2 border-primary/30 mb-4 sm:mb-6"></div>

      {/* Content Area */}
      {viewMode === "table" ? (
        <div className="flex items-center justify-center">
          <div className="-mx-2 w-full overflow-x-auto"> 
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full border-collapse text-text overflow-x-auto">
                <thead className="bg-secondary text-sm sm:text-lg font-semibold">
                  <tr>
                    <th scope="col" className="border border-primary/30 px-2 sm:px-5 py-2 sm:py-3 text-center whitespace-nowrap">ID</th>
                    <th scope="col" className="border border-primary/30 px-2 sm:px-5 py-2 sm:py-3 text-left">
                      {control === "Contacts" ? "Email" : "Caption"}
                    </th>
                    {control !== "Contacts" && (
                      <th scope="col" className="border border-primary/30 px-2 sm:px-5 py-2 sm:py-3 text-center whitespace-nowrap hidden md:table-cell">Images</th>
                    )}
                    {control === "Contacts" && (
                      <th scope="col" className="border border-primary/30 px-2 sm:px-5 py-2 sm:py-3 text-left hidden md:table-cell">Message</th>
                    )}
                    <th scope="col" className="border border-primary/30 px-2 sm:px-5 py-2 sm:py-3 text-center whitespace-nowrap hidden lg:table-cell">Author</th>
                    <th scope="col" className="border border-primary/30 px-2 sm:px-5 py-2 sm:py-3 text-center whitespace-nowrap">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-primary/30">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8">
                        <div className="flex flex-col items-center gap-3">
                          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent"></div>
                          <span className="text-text/60">Loading {control}...</span>
                        </div>
                      </td>
                    </tr>
                  ) : items.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8">
                        <div className="flex flex-col items-center gap-2">
                          <div className="text-text/30">
                            {control === "Albums" ? <Grid3x3 size={48} /> : control === "Feed" ? <MessageSquare size={48} /> : <Mail size={48} />}
                          </div>
                          <span className="text-text/60">No {control.toLowerCase()} found</span>
                        </div>
                      </td>
                    </tr>
                  ) : items.map((item, index) => (
                    <tr
                      key={index}
                      className="odd:bg-secondary/20 even:bg-primary/20 font-medium text-sm sm:text-md text-text hover:bg-primary/40 transition-colors duration-200"
                    >
                      <td className="px-2 sm:px-5 py-2 sm:py-3 text-center whitespace-nowrap">{index + 1}</td>
                      <td className="px-2 sm:px-5 py-2 sm:py-3 max-w-[200px] sm:max-w-none truncate sm:whitespace-normal">
                        {control === "Contacts" ? item.email : (item.title || 'Untitled')}
                      </td>
                      {control !== "Contacts" && (
                        <td className="px-2 sm:px-5 py-2 sm:py-3 text-center whitespace-nowrap hidden md:table-cell">
                          {item.images?.length || 0}
                        </td>
                      )}
                      {control === "Contacts" && (
                        <td className="px-2 sm:px-5 py-2 sm:py-3 max-w-xs truncate hidden md:table-cell">
                          {item.message || 'No message'}
                        </td>
                      )}
                      <td className="px-2 sm:px-5 py-2 sm:py-3 text-center whitespace-nowrap hidden lg:table-cell">Admin</td>
                      <td className="px-2 sm:px-5 py-2 sm:py-3">
                        <div className="flex gap-2 sm:gap-4 items-center justify-center">
                          <button
                            aria-label={`Edit ${control} ${item.title || item.email}`}
                            className="text-accent hover:text-accent/80 transition-colors duration-200"
                          >
                            <NotebookPen size={18} className="sm:w-5 sm:h-5" />
                          </button>
                          <button
                            aria-label={`Delete ${control} ${item.title || item.email}`}
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
      ) : (
        <div className="p-2 sm:p-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
              <span className="text-text/60">Loading {control}...</span>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="text-text/30">
                {control === "Albums" ? <Grid3x3 size={64} /> : control === "Feed" ? <MessageSquare size={64} /> : <Mail size={64} />}
              </div>
              <span className="text-text/60">No {control.toLowerCase()} found</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {items.map((item, index) => (
                control === "Albums" ? (
                  <AlbumCard key={index} item={item} index={index} />
                ) : control === "Feed" ? (
                  <FeedCard key={index} item={item} index={index} />
                ) : (
                  <ContactCard key={index} item={item} index={index} />
                )
              ))}
            </div>
          )}
        </div>
      )}

      {/* Create Modal */}
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <div className="bg-primary/30 backdrop-blur-md text-white w-full h-full rounded-lg py-6 sm:py-10 px-4 sm:px-10">
            <div className="title text-center border-b-2 border-accent/50 pb-4 mb-6">
              <h1 className="text-2xl sm:text-3xl font-body font-bold">
                Create <span className="text-accent">{control}</span>
              </h1>
            </div>
            
            <form 
              onSubmit={control === "Albums" ? handleGallerySubmit : control === "Feed" ? handleFeedSubmit : handleContactsSubmit} 
              className="space-y-6"
            >
              {control === "Contacts" ? (
                <>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-semibold text-text uppercase tracking-wide">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input 
                      id="email"
                      type="email" 
                      placeholder="Enter email address..." 
                      value={email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      required
                      className="w-full bg-secondary/50 border-2 border-primary/40 rounded-lg px-4 py-3 text-text placeholder-text/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm font-semibold text-text uppercase tracking-wide">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea 
                      id="message"
                      placeholder="Enter message..."
                      value={message}
                      onChange={(e) => handleMessageChange(e.target.value)}
                      required
                      rows={5}
                      className="w-full bg-secondary/50 border-2 border-primary/40 rounded-lg px-4 py-3 text-text placeholder-text/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
                    />
                  </div>
                </>
              ) : (
                <>
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
                        Description <span className="text-red-400">*</span>
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
                </>
              )}

              <div className="flex gap-3 pt-4">
                <button 
                  type="submit"
                  disabled={currentMutation.isPending}
                  className="flex-1 bg-accent text-primary font-semibold py-3 px-6 rounded-lg hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-accent shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {currentMutation.isPending ? (
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
                  disabled={currentMutation.isPending}
                  className="px-6 py-3 bg-transparent border-2 border-text/30 text-text font-semibold rounded-lg hover:bg-text/10 focus:outline-none focus:ring-2 focus:ring-text/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
              
              {currentMutation.isError && (
                <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <p className="text-red-200 text-sm">
                    Failed to create {control}. Please try again.
                  </p>
                </div>
              )}
            </form>
          </div>
        </Modal>
      )}
    </section>
  );
}