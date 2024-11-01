import { useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import { format } from "date-fns";

const EditPost = () => {
  const getPostById = useStoreState((state) => state.getPostById);
  const editTitle = useStoreState((state) => state.editTitle);
  const editBody = useStoreState((state) => state.editBody);

  const editPost = useStoreActions((actions) => actions.editPost);
  const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
  const setEditBody = useStoreActions((actions) => actions.setEditBody);

  const history = useHistory();

  const { id } = useParams();
  const post = getPostById(id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = {
      id,
      title: editTitle,
      datetime,
      body: editBody,
    };

    editPost(updatedPost);
    history.push("/");
  };

  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title:</label>
            <input
              type="text"
              id="postTitle"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post:</label>
            <textarea
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            ></textarea>
            <button type="button" onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post Not Found</h2>
          <p>Well, that's disappointing.</p>
          <p>
            <Link to="/">Visit Our HomePage</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
