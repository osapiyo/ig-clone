import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import React from 'react'
import { USERS } from '../../data/users'

const Stories = () => {
  return (
    <View style={{ marginBottom: 13 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((story, index) => (
          <View key={index} style={{ alignItems: 'center' }}>
            <Image source={{ uri: story.image }} style={styles.story} />
            <Text style={{ color: 'white' }}>
              {story.user.length > 8
                ? story.user.replace(/\s+/g, '').slice(0, 7).toLowerCase() +
                  '...'
                : story.user.replace(/\s+/g, '').toLowerCase()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 2,
    borderColor: '#FF8501',
  },
})

export default Stories
