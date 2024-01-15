import React from "react";

interface IButtonProps {
  className?: string,
  children?: React.ReactNode,
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  autoFocus?: boolean | undefined;
  disabled?: boolean | undefined;
  form?: string | undefined;
  formAction?: string | undefined;
  formEncType?: string | undefined;
  formMethod?: string | undefined;
  formNoValidate?: boolean | undefined;
  formTarget?: string | undefined;
  name?: string | undefined;
  type?: 'submit' | 'reset' | 'button' | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
  loading?: boolean 
  styleOnly?: boolean
}


const Button: React.FunctionComponent<IButtonProps> = (props) => {
  const { children, className, onClick, loading, styleOnly } = props

  function Container({ type, children, ...props }:IButtonProps) {    
    return React.createElement(
      styleOnly ? 'div' : 'a', 
      props, 
      children
    );
  }
    
  return (
    <Container
      onClick={onClick}
      className={`flex items-center justify-center  rounded-md bg-sky-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 ${className}`}>
        { loading && 
        <div>
        <svg className={`animate-spin -ml-1 mr-3 h-5 w-5 text-white`} viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="rgba(255,255,255,0)"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        </div>
        }
      {children}
    </Container>
  );
};

export default Button;
