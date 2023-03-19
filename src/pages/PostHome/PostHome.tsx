import { Feed } from "../../components/Feed/Feed";
import { IPost } from "../../types/Api";
import Post from "../../components/Post/Post";
import TextForm from "../../components/TextForm/TextForm";
import { useAppDataStore } from "../../state/appData.state";

type Props = {};

const PostHome = (props: Props) => {
  const { addedPosts, deletedPosts } = useAppDataStore();

  return (
    <>
      <TextForm type="post" />
      <Feed<IPost>
        component={Post}
        apiEndpoint="posts"
        addedArray={addedPosts}
        deletedArray={deletedPosts}
      />
    </>
  );
};

export default PostHome;
