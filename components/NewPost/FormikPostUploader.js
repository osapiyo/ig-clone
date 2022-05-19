import { View, Text, Image, TextInput, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Divider } from 'react-native-elements'
import validUrl from 'valid-url'
import { auth, db } from '../../firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
// import firebase from 'firebase'
// import * as firebase from 'firebase'
// import firebase from 'firebase/app'

const PLACEHOLDER_IMG =
  'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png'

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required('A URL is required'),
  caption: Yup.string().max(2200, 'Caption has reached the character limit'),
})

const FormikPostUploader = ({ navigation }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)

  const getUserName = async () => {
    const user = auth.currentUser
    const usersRef = collection(db, 'users')
    const queryUser = query(usersRef, where('owner_uid', '==', user.uid))
    const querySnapshot = await getDocs(queryUser)
    const unsubscribe = await querySnapshot.docs.map((doc) => {
      setCurrentLoggedInUser({
        username: doc.data().username,
        username: doc.data().profile_picture,
      })
    })
    return unsubscribe
  }
  useEffect(() => {
    getUserName()
  }, [])

  // サブコレクションを追加する方法が間違っていると思われる
  const uploadPostToFirebase = async (imageUrl, caption) => {
    const subCollectionRef = collection(
      db,
      'users',
      auth.currentUser.email,
      'posts'
    )
    const unsubscribe = await setDoc(doc(subCollectionRef), {
      imageUrl: imageUrl,
      user: currentLoggedInUser.username,
      profile_picture: currentLoggedInUser.profile_picture,
      owner_uid: auth.currentUser.uid,
      caption: caption,
      // createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      likes: 0,
      likes_by_users: [],
      comments: [],
    })

    navigation.goBack()

    return unsubscribe
  }

  return (
    <Formik
      initialValues={{ caption: '', imageUrl: '' }}
      onSubmit={(values) => {
        console.log(values)
        console.log('Your post was submitted successfully ')

        uploadPostToFirebase(values.imageUrl, values.caption)
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View
            style={{
              margin: 20,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            <Image
              source={{
                uri: validUrl.isUri(thumbnailUrl)
                  ? thumbnailUrl
                  : PLACEHOLDER_IMG,
              }}
              style={{ width: 100, height: 100, backgroundColor: 'white' }}
            />

            <View style={{ flex: 1, margin: 12 }}>
              <TextInput
                style={{ color: 'white', fontSize: 20 }}
                placeholder='Write a caption...'
                placeholderTextColor='gray'
                multiline={true}
                onChangeText={handleChange('caption')}
                onBlur={handleBlur('caption')}
                value={values.caption}
              />
            </View>
          </View>
          <Divider width={0.2} orientation='vertical' />
          <TextInput
            onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
            style={{ color: 'white', fontSize: 18 }}
            placeholder='Enter Image Url'
            placeholderTextColor='gray'
            onChangeText={handleChange('imageUrl')}
            onBlur={handleBlur('imageUrl')}
            value={values.imageUrl}
          />
          {errors.imageUrl && (
            <Text style={{ fontSize: 10, color: 'red' }}>
              {errors.imageUrl}
            </Text>
          )}

          <Button onPress={handleSubmit} title='Share' disabled={!isValid} />
        </>
      )}
    </Formik>
  )
}

export default FormikPostUploader
