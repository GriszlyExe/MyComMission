type FieldContainerProps = {
    name: string;
    value: string;
};

export default function FieldContainer({ name, value }: FieldContainerProps) {
    return (
        <div className='grid grid-cols-3 mb-14'>
            <div className="font-bold ">{name}:</div>
            <div className="col-span-2 w-full h-auto flex items-center">
                {value}
                {name === 'Price' && " $"}
            </div>
        </div>
    );
}
