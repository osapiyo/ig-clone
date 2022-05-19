import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import Header from '../components/home/Header'
import Stories from '../components/home/Stories'
import Post from '../components/home/Post'
import { POSTS } from '../data/posts'
import BottomTab, { bottomTabIcons } from '../components/home/BottomTab'
import { db } from '../firebase'
import { collectionGroup, query, getDocs } from 'firebase/firestore'

const HomeScreen = ({ navigation }) => {
  useEffect(async () => {
    const posts = query(collectionGroup(db, 'posts'))
    const querySnapshot = await getDocs(posts)

    console.log(querySnapshot.docs.map((doc) => doc.data()))
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {POSTS.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTab icons={bottomTabIcons} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
})

export default HomeScreen
