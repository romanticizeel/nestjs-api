export const GetArticlesResponseExample = {
  statusCode: 200,
  message:
    'User Articles data retrieved successfully.',
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

export const GetArticleByIdResponseExample = {
  statusCode: 200,
  message:
    'User Article data retrieved successfully.',
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

export const CreateArticleResponseExample = {
  statusCode: 201,
  message: 'Article created successfully.',
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

export const EditArticleResponseExample = {
  statusCode: 200,
  message: 'Article updated successfully.',
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
