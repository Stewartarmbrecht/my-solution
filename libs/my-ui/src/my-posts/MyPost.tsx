import { Post } from '@my-sample/my-backend';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';

/* eslint-disable-next-line */
export interface MyPostProps {
  post: Post;
}


export function MyPost(props: MyPostProps) {
  const deletePost = async () => {
    const post = await DataStore.delete(props.post);
    console.log('Post deleted successfully!', post);
  }

  return (
    <View key={props.post.id} style={styles.container}>
      <Pressable 
        onPress={deletePost}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteText}>X</Text>
      </Pressable>
      <Text style={styles.title}>{props.post.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    flexDirection: 'row',
    // Align children to the middle
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 24,
    padding: 8,
  },
  deleteButton: {
    backgroundColor: '#cccccc',
    padding: 8,
    borderRadius: 8,
  },
  deleteText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 24,
    padding: 2,
  },
});

export default MyPost;


