import { cn } from "@/lib/utils";

interface ListItem {
  id: number;
  title: string;
  category: string;
  src: string;
  alt: string;
  color: "blue" | "orange" | "purple" | "cyan";
  href?: string;
}

interface RollingTextItemProps {
  item: ListItem;
}

const colorClassMap: Record<ListItem["color"], string> = {
  blue: "text-blue-500",
  orange: "text-primary",
  purple: "text-purple-500",
  cyan: "text-cyan-500",
};

function RollingTextItem({ item }: RollingTextItemProps) {
  const Wrapper = item.href ? "a" : "div";
  const wrapperProps = item.href
    ? {
        href: item.href,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "group relative w-full cursor-pointer border-b border-white/10 overflow-hidden py-8 block",
      }
    : {
        className: "group relative w-full cursor-pointer border-b border-white/10 overflow-hidden py-8",
      };

  return (
    // @ts-ignore
    <Wrapper {...wrapperProps}>
      {/* Rolling text */}
      <div className="relative overflow-hidden h-[60px] md:h-24">
        <div className="transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
          {/* State 1: Normal */}
          <div className="h-[60px] md:h-24 flex items-center">
            <h2 className="text-5xl md:text-8xl font-black text-white/90 uppercase tracking-tighter">
              {item.title}
            </h2>
          </div>

          {/* State 2: Hover (Italic + Color) */}
          <div className="h-[60px] md:h-24 flex items-center">
            <h2
              className={cn(
                "text-5xl md:text-8xl font-black uppercase tracking-tighter italic",
                colorClassMap[item.color]
              )}
            >
              {item.title}
            </h2>
          </div>
        </div>
      </div>

      {/* Category Label */}
      <span className="absolute top-10 right-4 text-xs font-bold uppercase tracking-widest text-white/40 transition-opacity duration-300 group-hover:opacity-0 hidden md:block">
        {item.category}
      </span>

      {/* Image Reveal Effect */}
      <div
        className={cn(
          "pointer-events-none absolute right-0 top-1/2 z-20 h-40 w-64 -translate-y-1/2 overflow-hidden rounded-lg shadow-2xl",
          "transition-all duration-500 ease-out",
          "opacity-0 scale-95 rotate-3 translate-x-4",
          "group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0 group-hover:translate-x-0"
        )}
      >
        <div className="relative h-full w-full">
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-full object-cover grayscale transition-all duration-500 ease-out group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
        </div>
      </div>
    </Wrapper>
  );
}

function RollingTextList({ items }: { items?: ListItem[] }) {
  const defaultItems: ListItem[] = [
    {
      id: 1,
      title: "Discover",
      category: "GitHub",
      src: "https://avatars.githubusercontent.com/u/164841087?v=4",
      alt: "HappyMarmot123",
      color: "orange",
      href: "https://github.com/HappyMarmot123",
    },
    {
      id: 2,
      title: "Design",
      category: "GitHub",
      src: "https://avatars.githubusercontent.com/u/164841087?v=4",
      alt: "HappyMarmot123",
      color: "orange",
      href: "https://github.com/HappyMarmot123",
    },
    {
      id: 3,
      title: "Develop",
      category: "GitHub",
      src: "https://avatars.githubusercontent.com/u/164841087?v=4",
      alt: "HappyMarmot123",
      color: "orange",
      href: "https://github.com/HappyMarmot123",
    },
  ];

  const displayItems = items || defaultItems;

  return (
    <section className="py-24 bg-background border-t border-white/5">
      <div className="container px-4 mx-auto">
        <div className="w-full flex flex-col">
          {displayItems.map((item) => (
            <RollingTextItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { RollingTextList };
