const styledBtn = `inline-block h-10 p-2 bg-white border-l min-w-[40px] ml-[-1px] outline-0`
const styledBtnHover = `hover:bg-sky-100`
interface IQuantityProps {
  value: number
  handleOnMinus?: () => void,
  handleOnPlus?: () => void,
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>)=>void
}

const Quantity: React.FunctionComponent<IQuantityProps> = (props) => {
  const { value, handleOnMinus, handleOnPlus, handleOnChange } = props
  let valueDisplay = value < 0 ? 0 : value;
  return (
    <div className="quantity my-5 inline-flex rounded-md border">
      <button className={`${styledBtn} ${styledBtnHover}`} onClick={handleOnMinus}>-</button>
      <input className={`${styledBtn} w-[70px] text-center focos:outline-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`} type="number" onChange={handleOnChange} value={valueDisplay}/>
      <button className={`${styledBtn} ${styledBtnHover}`} onClick={handleOnPlus}>+</button>
    </div>
  );
};

export default Quantity;
