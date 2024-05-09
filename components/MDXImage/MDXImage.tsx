import Image, { StaticImageData } from "next/image";

interface IMDXImage {
  src: string;
  title: string;
  width?: string;
  height?: string;
}

const MDXImage = ({ src, title, width, height }: IMDXImage) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src={src}
        width={640}
        height={500}
        alt={title}
        className="w-auto mb-2 border border-gray-200 dark:border-gray-700 rounded-md"
        style={width ? { width } : {}}
      />
      <p className="text-center text-gray-500 dark:text-gray-400 m-0 text-sm">
        {title}
      </p>
    </div>
  );
};

export default MDXImage;
