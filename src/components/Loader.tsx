interface Props {
  isActive: boolean;
}

const Loader: React.FC<Props> = ({ isActive }) => {
  return (
    <>
      {isActive ? (
        <div className="flex items-center justify-center absolute left-0 top-0 right-0 bottom-0 bg-black opacity-70 z-50 overflow-hidden">
          <span
            className="w-12 h-12 
                        rounded-full 
                        inline-block 

                        border-t-4
                        border-t-solid
                        border-t-blue-400

                        border-r-4
                        border-r-solid
                        border-r-transparent
                        box-border

                        after:content-['']
                        after:box-border
                        after:absolute
                        after:left-0
                        after:top-0
                        after:w-12
                        after:h-12
                        after:rounded-full
                        after:border-b-4
                        after:border-b-solid
                        after:border-b-red-500
                        after:border-l-4
                        after:border-l-solid
                        after:border-l-transparent
                        animate-spin"
          ></span>
        </div>
      ) : (
        <div className="invisible flex items-center justify-center absolute left-0 top-0 right-0 bottom-0 bg-black opacity-70 z-50 overflow-hidden">
          <span
            className="w-12 h-12 
                        rounded-full 
                        inline-block 

                        border-t-4
                        border-t-solid
                        border-t-blue-400

                        border-r-4
                        border-r-solid
                        border-r-transparent
                        box-border

                        after:content-['']
                        after:box-border
                        after:absolute
                        after:left-0
                        after:top-0
                        after:w-12
                        after:h-12
                        after:rounded-full
                        after:border-b-4
                        after:border-b-solid
                        after:border-b-red-500
                        after:border-l-4
                        after:border-l-solid
                        after:border-l-transparent
                        animate-spin"
          ></span>
        </div>
      )}
    </>
  );
};

export default Loader;
