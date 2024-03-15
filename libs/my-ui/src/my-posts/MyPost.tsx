import { Post, postDeleted } from '@my-solution/my-shared';
import { useAppDispatch } from '@my-solution/my-state';
import { View, Text, StyleSheet, Pressable } from 'react-native';

/* eslint-disable-next-line */
export interface MyPostProps {
  post: Post;
}

export function MyPost(props: MyPostProps) {
  const dispatch = useAppDispatch();
  const deletePostHandler = () => {
    dispatch(postDeleted(props.post));
  }

  return (
    <View key={props.post.id} style={styles.container}>
      <Pressable 
        onPress={deletePostHandler}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteText}>X</Text>
      </Pressable>
      <Text style={styles.title}>{props.post.title}</Text>
    </View>
  );
}

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
