import supabase from './supabase'

//$ In modern frontend development, it is pretty common not to pass mutlitple arguments to a function, but to pass them as an object.

export const signup = async ({ fullName, email, password }) => {
    const { data, error } = await supabase.auth.signUp({
        email, password,
        options: {
            data: {
                fullName,
                avatar: ''
            }
        }
    })

    if (error) throw new Error(error.message)

    return data?.user
}

export const login = async ({ email, password }) => {
    let { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) throw new Error(error.message)

    return data?.user
}

export const getCurrentUser = async () => {
    //? getSession() will get user data from local storage
    const { data: session } = await supabase.auth.getSession()

    if (!session.session) return null

    const { data, error } = await supabase.auth.getUser()

    if (error) throw new Error(error.message)

    return data?.user
}

export const logout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) throw new Error(error.message)
}