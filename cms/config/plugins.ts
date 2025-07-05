export default {
    //
    graphql: {
      config: {
        endpoint: '/graphql',
        shadowCRUD: true,
        playgroundAlways: process.env.NODE_ENV === 'development' ? true : false,
        depthLimit: 7,
        amountLimit: 100,   
        apolloServer: {
          tracing: false,
        },
      },
    },
  };


