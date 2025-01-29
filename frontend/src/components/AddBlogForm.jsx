/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const AddBlogForm = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "",
  });
  const [image, setImage] = useState(null);
  const [authorImage, setAuthorImage] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("image", image);
    formData.append("authorImage", authorImage);

    try {
      const response = await axios.post("/api/v1/blog/create-blog", formData);
      toast.success(response?.data?.message || "Blog created successfully!");

      setData({
        title: "",
        description: "",
        category: "Startup",
        author: "",
      });
      setImage(null);
      setAuthorImage(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create blog post"
      );
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const FileUpload = ({ label, file, setFile }) => (
    <div className="grid w-full gap-1.5">
      <Label>{label}</Label>
      <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer relative">
        <input
          type="file"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div className="flex items-center gap-4">
          <div className="p-2 border rounded-md">
            <Upload className="h-4 w-4" />
          </div>
          <div className="flex-1">
            {file ? (
              <p className="text-sm">{file.name}</p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Click to upload {label.toLowerCase()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Create New Blog Post
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid gap-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                placeholder="Enter blog title"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
                placeholder="Write your blog content here..."
                rows={6}
              />
            </div>

            <div className="grid gap-1.5">
              <Label>Category</Label>
              <Select
                value={data.category}
                onValueChange={(value) => setData({ ...data, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Startup">Startup</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="Travel">Travel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={data.author}
                onChange={(e) => setData({ ...data, author: e.target.value })}
                placeholder="Enter author's name"
              />
            </div>

            <FileUpload label="Blog Image" file={image} setFile={setImage} />

            <FileUpload
              label="Author Image"
              file={authorImage}
              setFile={setAuthorImage}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Posting..." : "Publish Blog Post"}{" "}
              {/* Conditional text */}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBlogForm;
