const ListLoadingSkeleton2 = () => {
  return (
    <div className="flex items-center justify-between w-full h-16 p-3 rounded-lg gap-7 dark:bg-platinum/5 bg-platinum/30">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-sm bg-black/15 justify-self-center dark:bg-platinum/10 animate-pulse"></div>

        <div className="w-8 h-8 rounded-lg bg-black/15 dark:bg-platinum/10 animate-pulse"></div>

        <div className="w-16 h-3 rounded-sm bg-black/15 justify-self-center dark:bg-platinum/10 animate-pulse"></div>
      </div>
      <div className="flex flex-col items-center gap-2 ml-6">
        <div className="w-6 h-5 rounded-md bg-black/15 justify-self-center dark:bg-platinum/10 animate-pulse"></div>
        <div className="w-12 h-5 rounded-md bg-black/15 justify-self-center dark:bg-platinum/10 animate-pulse"></div>
      </div>
      <div className="w-20 h-8 rounded-lg bg-black/15 justify-self-center dark:bg-platinum/10 animate-pulse"></div>
    </div>
  );
};

export default ListLoadingSkeleton2;
