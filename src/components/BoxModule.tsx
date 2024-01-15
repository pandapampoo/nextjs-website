import Image from "next/image";
export interface IBoxModuleProps {
  title?: string,
  align?: string,
  children?: React.ReactNode
}

const BoxModule: React.FunctionComponent<IBoxModuleProps> = (props) => {
  const { title, align, children } = props;
  return (
    <div className="bg-white rounded-lg shadow drop-shadow-md my-10 p-8">
      <div className={`font-bold text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white ${align === 'center' ?? 'text-center'}`}>{title}</div>
      <div className="mt-6">
        {children}
      </div>
    </div>
  );
}

export default BoxModule
