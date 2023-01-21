import { useEffect, useState } from "react"


export const useDebouncedValue = ( input:string="", time:number=500 ) => {
  
    const [dobouncedValue, setDobouncedValue] = useState(input);

    useEffect(() => {
        
        const timeout = setTimeout( () => {

            setDobouncedValue( input )

        }, time)

        //limpiar timeout anterior
        return () => {      
            clearTimeout( timeout )
        }

    }, [input])
    


    return dobouncedValue
}
