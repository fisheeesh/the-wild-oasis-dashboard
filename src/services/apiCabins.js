import supabase, { supabaseUrl } from "./supabase"

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

export const createCabin = async (newCabin) => {
    //$ https://kqcnbskzonslscatafxy.supabase.co/storage/v1/object/public/cabin-images/cabin-005.jpg
    const imageName = `${Date.now()}-${newCabin.image.name}`.replaceAll('/', '')

    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

    //? First, we will create a new cabin to the supbase DB
    const { data, error } = await supabase
        .from('cabins')
        .insert([{ ...newCabin, image: imagePath }])
        .select()

    if (error) {
        console.log(error)
        throw new Error('Cabin could not be created.')
    }

    //? Only when there is no error while creating a new cabin
    //? Second, we will upload an image to the bucket
    const { error: storageError } = await supabase
        .storage
        .from('cabin-images')
        .upload(imageName, newCabin.image)

    //? If there is an error while uploading an image, we will delete the cabin that has been created recently
    if (storageError) {
        await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id)
        console.log(storageError)
        throw new Error('Cabin image could not be uploaded and cabin was not created.')
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