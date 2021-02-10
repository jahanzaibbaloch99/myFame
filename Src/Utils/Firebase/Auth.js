import Auth from "@react-native-firebase/auth"
export const SinginCreater = async (email, password) => {
    await Auth().signInWithEmailAndPassword(email,password).then((data) => {
        console.log(data , 'Data')
        return data
    }).catch((e) => {
        console.log(e)
        return e
    })
};

export const SignupCreater = async (email,password) => {
    await Auth().createUserWithEmailAndPassword(email,password).then((data ) => {
        console.log(data , "DATA")
        return data
    }).catch((e) => {
        console.log(e,"E")
    })
}