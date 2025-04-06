import supabase from './supabase'

//? In modern frontend development, it is pretty common not to pass mutlitple arguments to a function, but to pass them as an object.
export const login = async ({ email, password }) => {
    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) throw new Error(error.message)

    return { data, error }
}