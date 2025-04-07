import supabase, { supabaseUrl } from './supabase'

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

    if (data?.user && data.user.identities.length === 0) {
        throw new Error("This email is already registered. Try with another one.")
    }

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

export const updateCurrentUser = async ({ password, fullName, avatar }) => {
    //? 1. Update fullName or password
    let updateData;

    if (password) updateData = { password }
    if (fullName) updateData = { data: { fullName } }

    const { data, error: userError1 } = await supabase.auth.updateUser(updateData)

    if (userError1) throw new Error(userError1.message)

    if (!avatar) return data

    //? 2. Upload avatar
    const fileName = `avatar-${data.user.id}-${Date.now()}`

    const { error: storageError } = await supabase.storage.from('avatars').upload(fileName, avatar)

    if (storageError) throw new Error(storageError.message)

    //? 3. Upload avatar in user
    const { data: updateUser, error: userError2 } = await supabase.auth.updateUser({
        data: {
            avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
        }
    })

    if (userError2) throw new Error(userError2.message)

    return updateUser
}