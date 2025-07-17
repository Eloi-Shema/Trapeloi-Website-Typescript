const GridLoadingSkeleton = () => {
  return (
    <div className="box-border flex flex-col justify-self-center justify-center gap-7 p-6 dark:bg-platinum/5 bg-platinum/30 w-60 h-[430px] xs:hidden md:grid rounded-lg">
      <div className="w-56 h-56 rounded-sm bg-black/10 dark:bg-platinum/10 animate-pulse"></div>

      <div className="h-6 -mt-4 rounded-sm bg-black/10 justify-self-center w-28 dark:bg-platinum/10 animate-pulse"></div>
      <div className="w-32 h-4 bg-black/10 rounded-2xl justify-self-center dark:bg-platinum/10 animate-pulse"></div>
      <div className="h-10 mt-4 rounded-lg bg-black/10 w-36 justify-self-center dark:bg-platinum/10 animate-pulse"></div>
    </div>
  );
};

export default GridLoadingSkeleton;
