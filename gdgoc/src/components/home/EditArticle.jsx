import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Textarea,
  Button,
  Stack,
} from "@chakra-ui/react";
import { RadioGroup } from "@chakra-ui/radio";
import { Radio } from "@chakra-ui/radio";
import { Divider } from "@chakra-ui/layout";
import { toast } from "react-toastify";
import Nav from "../layout/Nav";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { useFirebase } from "../../contexts/FirebaseContext";

import LoadingSmall from "../layout/LoadingSmall";

function EditArticle() {
  const { articleID } = useParams();
  const { currentUser } = useAuth();
  const { editArticle, getSpecificArticle } = useFirebase();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [docId, setDocId] = useState("");
  const [visibility, setVisibility] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const data = await getSpecificArticle(articleID);
        const articleData = data.docs[0].data();
        setDocId(data.docs[0].id);
        setTitle(articleData.content.title);
        setSubtitle(articleData.content.subtitle);
        setArticleContent(articleData.content.articleContent);
        setVisibility(articleData.visibility);
      } catch (err) {
        console.error(err);
        toast.info("Article not found");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleID, getSpecificArticle, toast]);

  const handleEdit = async () => {
    if (!title || !subtitle || !articleContent) {
     toast.info("Please fill all the fields");
      return;
    }

    const data = { title, subtitle, articleContent, visibility };

    try {
      setBtnLoading(true);
      await editArticle(docId, data);
      toast.success("Article updated successfully");
      navigate(`/article/${articleID}`);
    } catch (err) {
      console.error(err);
     toast.error("Failed to update article");
    } finally {
      setBtnLoading(false);
    }
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
          <Box px={["6", "10"]}>
            <Text fontSize={["2xl", "3xl"]} textAlign="center">
              Edit your article
            </Text>
            <Text
              fontSize={["sm", "md"]}
              textAlign="center"
              color="blue.500"
            >
              writing as {`@${currentUser.email.split("@")[0]}`}
            </Text>

            <Textarea
              variant="unstyled"
              placeholder="Title"
              value={title}
              fontSize={["4xl", "5xl"]}
              mt="10"
              resize="vertical"
              rows={1}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              variant="unstyled"
              placeholder="Subtitle"
              value={subtitle}
              fontSize={["xl", "2xl"]}
              resize="vertical"
              rows={1}
              onChange={(e) => setSubtitle(e.target.value)}
            />

            <Divider my={[6, 10]} />

            <Textarea
              variant="unstyled"
              placeholder="Write your story here"
              value={articleContent}
              fontSize={["md", "lg"]}
              resize="vertical"
              onChange={(e) => setArticleContent(e.target.value)}
              rows={8}
            />

            <Divider my={[6, 10]} />

            <Box>
              <Text fontSize={["xl", "2xl"]} mb="4">
                Choose your article's visibility
              </Text>
              <RadioGroup onChange={setVisibility} value={visibility}>
                <Stack direction="row">
                  <Radio size="lg" value="public">
                    Public
                  </Radio>
                  <Radio size="lg" value="private">
                    Private
                  </Radio>
                </Stack>
              </RadioGroup>
              <Text fontSize={["sm", "md"]} opacity="0.4" mt="2">
                {visibility === "private"
                  ? "Your article will not be shared with the community. It will be visible only to you. You can change it later anytime."
                  : "Your article will be shared with the community and anyone could read it. You can change it later anytime."}
              </Text>
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection={["column-reverse", null, "row"]}
              my="6"
            >
              <Button
                fontSize={["md", "lg"]}
                py={8}
                isFullWidth
                as={Link}
                to="/my-articles"
                variant="outline"
                mt={["4", "0"]}
              >
                Discard
              </Button>
              <Button
                fontSize={["md", "lg"]}
                py={8}
                isFullWidth
                colorScheme="blue"
                onClick={handleEdit}
                isLoading={btnLoading}
              >
                Update
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default EditArticle;
