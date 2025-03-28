import supabase from "./supabase"

export const getCabins = async () => {

    let { data, error } = await supabase
        .from('cabins')
        .select('*')

    if (error) {
        console.log(error)
        throw new Error('Cabins could not be loaded.')
    }

    return data
}

export const deleteCabin = async (cabinId) => {

    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', cabinId)

    if (error) {
        console.log(error)
        throw new Error('Cabin could not be deleted.')
    }

    return data
}