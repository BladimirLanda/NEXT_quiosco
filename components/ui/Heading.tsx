//HEADING

function Heading( {children} : {children : React.ReactNode} ) {
    //---VIEW---//
    return (
        <h1 className="text-2xl p-3 my-10 font-black rounded-2xl
        text-amber-500 bg-indigo-600 inline-block md:text-4xl">
            {children}
        </h1>
    )
}

export default Heading