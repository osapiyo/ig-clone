import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'
import { color } from 'react-native-elements/dist/helpers'

const postFooterIcons = [
  {
    name: 'Like',
    imageUril:
      'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png',
    LinedImageUrl: 'https://img.icons8.com/ios-glyphs/90/fa314a/like--v1.png',
  },
  {
    name: 'Comment',
    imageUril:
      'https://img.icons8.com/fluency-systems-regular/60/ffffff/comments.png',
  },
  {
    name: 'Share',
    imageUril:
      'https://img.icons8.com/fluency-systems-regular/60/ffffff/paper-plane.png',
  },
  {
    name: 'Save',
    imageUril:
      'https://img.icons8.com/fluency-systems-regular/60/ffffff/bookmark.png',
  },
]

const Post = ({ post }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation='vertical' />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter />
        <Likes post={post} />
        <Caption post={post} />
        <CommentsSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  )
}

const PostHeader = ({ post }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 5,
      alignItems: 'center',
    }}
  >
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image source={{ uri: post.profile_picture }} style={styles.story} />
      <Text style={{ color: 'white', marginLeft: 5, fontWeight: '700' }}>
        {post.user}
      </Text>
    </View>

    <View>
      <Text style={{ color: 'white', fontSize: 24, fontWeight: '900' }}>
        ...
      </Text>
    </View>
  </View>
)

const PostImage = ({ post }) => (
  <View style={{ width: '100%', height: 450 }}>
    <Image
      source={{ uri: post.imageUrl }}
      style={{ height: '100%', resizeMode: 'cover' }}
    />
  </View>
)

const PostFooter = () => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <View style={styles.leftFooterIconsContainer}>
      <Icon
        imgStyle={styles.footerIcon}
        imgUrl={postFooterIcons[0].imageUril}
      />
      <Icon
        imgStyle={styles.footerIcon}
        imgUrl={postFooterIcons[1].imageUril}
      />
      <Icon
        imgStyle={styles.footerIcon}
        imgUrl={postFooterIcons[2].imageUril}
      />
    </View>
    <View>
      <Icon
        imgStyle={styles.footerIcon}
        imgUrl={postFooterIcons[3].imageUril}
      />
    </View>
  </View>
)

const Icon = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{ uri: imgUrl }} />
  </TouchableOpacity>
)

const Likes = ({ post }) => (
  <View style={{ flexDirection: 'row', marginTop: 4 }}>
    <Text style={{ color: 'white', fontWeight: '600' }}>
      {post.likes.toLocaleString('en')} likes
    </Text>
  </View>
)

const Caption = ({ post }) => (
  <Text style={{ color: 'white' }}>
    <Text style={{ fontWeight: '600' }}>{post.user}</Text>
    <Text style={{ fontFamily: 'sans-serif-light' }}>
      {'  '} {post.caption}
    </Text>
  </Text>
)

const CommentsSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {Boolean(post.comments.length) && (
      <Text style={{ color: 'gray' }}>
        View {post.comments.length > 1 ? ' all ' : ''}
        {post.comments.length}
        {'  '}
        {post.comments.length > 1 ? 'comments' : 'comment'}
      </Text>
    )}
  </View>
)

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: 'row', marginTop: 5 }}>
        <Text style={{ color: 'white' }}>
          <Text style={{ fontWeight: '600' }}>{comment.user}</Text>
          {'  '}
          <Text style={{ fontFamily: 'sans-serif-light' }}>
            {comment.comment}
          </Text>
        </Text>
      </View>
    ))}
  </>
)

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: '#FF8501',
  },

  footerIcon: {
    width: 28,
    height: 28,
  },

  leftFooterIconsContainer: {
    flexDirection: 'row',
    width: '32%',
    justifyContent: 'space-between',
  },
})

export default Post
