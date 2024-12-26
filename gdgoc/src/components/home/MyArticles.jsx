import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  Badge,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";
import { Divider } from "@chakra-ui/layout";
import { StarIcon, DeleteIcon, EditIcon, LockIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";
import Nav from "../layout/Nav";
import LoadingSmall from "../layout/LoadingSmall";
import { useFirebase } from "../../contexts/FirebaseContext";
import { Link } from "react-router-dom";
import { format } from "date-fns";

function MyArticles() {
  const { getMyArticles, deleteArticle } = useFirebase();
  const [articles, setArticles] = useState([]);
  const [docIDs, setDocIDs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectValue, setSelectValue] = useState("all");
  const [deletingIDs, setDeletingIDs] = useState([]);
  const [error, setError] = useState(null);


  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMyArticles();
      setArticles(data.docs.map((el) => el.data()));
      setDocIDs(data.docs.map((el) => el.id));
    } catch (err) {
      console.error(err);
      setError("Failed to load articles. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (docID) => {
    setDeletingIDs((prev) => [...prev, docID]);
    try {
      await deleteArticle(docID);
     toast.success("Article deleted successfully");
      fetchArticles();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete article");
    } finally {
      setDeletingIDs((prev) => prev.filter((id) => id !== docID));
    }
  };

  const renderVisibilityBadge = (visibility) => {
    const isPrivate = visibility === "private";
    const badgeText = isPrivate ? "Private" : "Public";
    const badgeColor = isPrivate ? "blue" : "green";
    return (
      <Badge variant="solid" fontSize="sm" colorScheme={badgeColor} mb="2">
        {badgeText} {isPrivate && <LockIcon ml="1" />}
      </Badge>
    );
  };

  const filteredArticles = selectValue === "all"
    ? articles
    : articles.filter((el) => el.visibility === selectValue);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box width={["100vw", null, null, "70vw"]} flexDirection="column">
        <Nav />
        {loading ? (
          <LoadingSmall />
        ) : (
          <Box mx="6">
            <Text fontSize="3xl" mb="4">Articles You Have Written</Text>
            {error && <Text color="red.500" mb="4">{error}</Text>}
            <Select value={selectValue} onChange={(e) => setSelectValue(e.target.value)} mb="6">
              <option value="all">All</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </Select>
            {!loading && !filteredArticles.length && (
              <Text textAlign="center" mt="6">No articles found. Write your first one!</Text>
            )}
            {filteredArticles.map((el, i) => (
              <Box key={docIDs[i]} as={Link} to={`/article/${el.articleID}`} mb="6">
                {renderVisibilityBadge(el.visibility)}
                <Text fontSize="2xl">{el.content?.title || "Untitled Article"}</Text>
                <Text opacity="0.6">{el.content?.subtitle || "No subtitle provided."}</Text>
                <Box mt="4">
                  {el.visibility !== "private" && (
                    <Text fontWeight="semibold" color="yellow.500">
                      {el.stars} <StarIcon color="yellow.500" />
                    </Text>
                  )}
                  <Text>{el.authorUsername}</Text>
                  <Text>{el.when ? format(new Date(el.when), "MMMM dd, yyyy") : "Date not available"}</Text>
                </Box>
                <Box mt="4" display="flex" gap="4">
                  <Button
                    as={Link}
                    to={`/edit-article/${el.articleID}`}
                    variant="outline"
                    rightIcon={<EditIcon />}
                    aria-label="Edit article"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(docIDs[i]);
                    }}
                    isLoading={deletingIDs.includes(docIDs[i])}
                    colorScheme="red"
                    rightIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </Box>
                <Divider my="4" />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default MyArticles;
