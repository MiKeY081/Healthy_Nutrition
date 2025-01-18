import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Share2, X } from 'lucide-react';

interface Comment {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timeAgo: string;
}

interface Post {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  timeAgo: string;
  isLiked?: boolean;
}

const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    },
    content: "Just tried the Mediterranean Quinoa Bowl recipe and it was amazing! Here's my version 📸",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    likes: 24,
    comments: [
      {
        id: 1,
        user: {
          name: "Mike Chen",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
        },
        content: "Looks delicious! Could you share the recipe?",
        timeAgo: "1 hour ago",
      }
    ],
    timeAgo: "2 hours ago",
  },
  // ... (previous posts remain the same)
];

export function Community() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [newComment, setNewComment] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked,
        };
      }
      return post;
    }));
  };

  const handleComment = (postId: number) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      user: {
        name: "You",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
      },
      content: newComment,
      timeAgo: "Just now",
    };

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, comment],
        };
      }
      return post;
    }));

    setNewComment('');
  };

  const handleShare = (postId: number) => {
    // In a real app, this would open a share dialog
    alert('Sharing functionality would be implemented here!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Community Feed</h1>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            Create Post
          </button>
        </div>

        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <img src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <h3 className="font-semibold">{post.user.name}</h3>
                    <span className="text-gray-500 text-sm">{post.timeAgo}</span>
                  </div>
                </div>
                <p className="mb-4">{post.content}</p>
                {post.image && (
                  <img src={post.image} alt="Post" className="w-full h-64 object-cover rounded-lg mb-4" />
                )}
                <div className="flex items-center space-x-6 text-gray-500 mb-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-2 ${post.isLiked ? 'text-green-600' : 'hover:text-green-600'}`}
                  >
                    <ThumbsUp className="w-5 h-5" />
                    <span>{post.likes}</span>
                  </button>
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="flex items-center space-x-2 hover:text-green-600"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>{post.comments.length}</span>
                  </button>
                  <button
                    onClick={() => handleShare(post.id)}
                    className="flex items-center space-x-2 hover:text-green-600"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
                {selectedPost?.id === post.id && (
                  <div className="border-t pt-4">
                    <div className="space-y-4 mb-4">
                      {post.comments.map(comment => (
                        <div key={comment.id} className="flex items-start space-x-3">
                          <img src={comment.user.avatar} alt={comment.user.name} className="w-8 h-8 rounded-full" />
                          <div className="flex-1 bg-gray-50 rounded-lg p-3">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium">{comment.user.name}</span>
                              <span className="text-gray-500 text-sm">{comment.timeAgo}</span>
                            </div>
                            <p className="text-gray-700">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                      />
                      <button
                        onClick={() => handleComment(post.id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}