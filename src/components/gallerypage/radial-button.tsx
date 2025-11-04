
export default function RadialButton({content}: {content: string}) {
  return (
    <button className='bg-background/50 backdrop-blur-xl border border-primary/80 shadow-lg text-text font-body p-2 rounded-full w-[140px] font-poppins cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-text hover:text-secondary'>
        <span>
            {content}
        </span>
    </button>
  )
}
