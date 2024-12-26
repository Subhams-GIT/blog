import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { Divider } from "@chakra-ui/layout";
import { StarIcon, LinkIcon } from "@chakra-ui/icons";
import Nav from "../layout/Nav";
import LoadingSmall from "../layout/LoadingSmall";
import { useFirebase } from "../../contexts/FirebaseContext";
import Comments from "./Comments";
import {toast} from "react-toastify";
function ViewArticle() {
  const articleIDFromURL = window.location.href.split("/").pop();
  const { getSpecificArticle, giveAStar } = useFirebase();

  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [starBtnLoading, setStarBtnLoading] = useState(false);
  const [docId, setDocId] = useState("");

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const data = await getSpecificArticle(articleIDFromURL);
      if (data.docs.length > 0) {
        setArticle(data.docs.map((el) => el.data()));
        setDocId(data.docs.map((el) => el.id));
      } else {
        throw new Error("Article not found");
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "The article you are looking for was not found",
        status: "error",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  const handleGiveAStar = async () => {
    try {
      setStarBtnLoading(true);
      await giveAStar(docId[0]);
      fetchArticle();
    } catch (err) {
      console.error(err);
    } finally {
      setStarBtnLoading(false);
    }
  };

  const handleShareArticle = () => {
    navigator.clipboard.writeText(window.location.href);
    // toast({
    //   title: "Article link copied to clipboard",
    //   status: "success",
    //   duration: 5000,
    // });
    toast.success("Article link copied to clipboard") 
  };

  const getDate = (timestamp) => {
    const d = new Date(timestamp);
    return d.toString();
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box
        width={["100vw", null, null, "70vw"]}
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <Nav />
        {loading ? (
          <LoadingSmall />
        ) : (
          <>
            {article.map((el, index) => (
              <Box key={index} px={["6", "10"]}>
                <Text fontSize={["4xl", "5xl"]}>{el.content.title}</Text>
                <Text fontSize={["xl", "2xl"]} opacity="0.8">
                  {el.content.subtitle}
                </Text>

                <Box display="flex" mt="6" flexDirection={["column", null, "row"]}>
                  <Text color="blue.500" fontSize={["lg", "xl"]} mr="4">
                    {el.authorUsername}
                  </Text>
                  <Text opacity="0.5" fontSize={["lg", "xl"]}>
                    {getDate(el.when).slice(4, 21)}
                  </Text>
                  <Spacer />
                  {el.visibility === "private" ? null : (
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      mt={[2, null, 0]}
                    >
                      <Text
                        fontWeight="semibold"
                        color="yellow.500"
                        fontSize={["lg", "xl"]}
                      >
                        {el.stars}
                      </Text>
                      <StarIcon
                        color="yellow.500"
                        fontSize={["lg", "xl"]}
                        mx="2"
                      />
                    </Box>
                  )}
                </Box>

                <Divider my="6" />

                <Text
                  fontSize={["lg", "xl"]}
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {el.content.articleContent}
                </Text>

                <Divider my="6" />

                {el.visibility === "private" ? null : (
                  <>
                    <Box display="flex">
                      <Button
                        rightIcon={<StarIcon />}
                        colorScheme="yellow"
                        variant="solid"
                        onClick={handleGiveAStar}
                        isLoading={starBtnLoading}
                        mr="2"
                      >
                        Give a star
                      </Button>
                      <Button
                        rightIcon={<LinkIcon />}
                        onClick={handleShareArticle}
                        colorScheme="blue"
                      >
                        Share
                      </Button>
                    </Box>

                    <Comments />
                  </>
                )}
              </Box>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
}

export default ViewArticle;
