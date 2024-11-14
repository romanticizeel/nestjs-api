export const GetBookmarksResponseExample = {
  statusCode: 200,
  message:
    'User Bookmarks data retrieved successfully.',
  data: [
    {
      id: 1,
      createdAt: '2024-11-12T06:42:48.961Z',
      updatedAt: '2024-11-13T07:41:47.731Z',
      title: 'Unlocking the Future of Technology',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit condortum, etiam luctus, etiam pellentesque.',
      link: 'https://www.example.com/technology',
    },
    {
      id: 1,
      createdAt: '2024-11-12T06:42:48.961Z',
      updatedAt: '2024-11-13T07:41:47.731Z',
      title: 'Unlocking the Future of Technology',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit condortum, etiam luctus, etiam pellentesque.',
      link: 'https://www.example.com/technology',
    },
  ],
};

export const GetBookmarkByIdResponseExample = {
  statusCode: 200,
  message:
    'User Bookmarks data retrieved successfully.',
  data: {
    id: 1,
    createdAt: '2024-11-12T06:42:48.961Z',
    updatedAt: '2024-11-13T07:41:47.731Z',
    title: 'Unlocking the Future of Technology',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit condortum, etiam luctus, etiam pellentesque.',
    link: 'https://www.example.com/technology',
    userId: 1,
  },
};

export const CreateBookmakrResponseExample = {
  statusCode: 201,
  message: 'Bookmark created successfully.',
  data: {
    id: 1,
    createdAt: '2024-11-12T06:42:48.961Z',
    updatedAt: '2024-11-13T07:41:47.731Z',
    title: 'Unlocking the Future of Technology',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit condortum, etiam luctus, etiam pellentesque.',
    link: 'https://www.example.com/technology',
  },
};

export const EditBookmarkResponseExample = {
  statusCode: 200,
  message: 'Bookmark updated successfully.',
  data: {
    id: 1,
    createdAt: '2024-11-12T06:42:48.961Z',
    updatedAt: '2024-11-13T07:41:47.731Z',
    title: 'Unlocking the Future of Technology',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit condortum, etiam luctus, etiam pellentesque.',
    link: 'https://www.example.com/technology',
  },
};
