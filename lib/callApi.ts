
// utils/callApi.ts

export const callApi = async <T> (
    endpoint: string,
    method: 'POST' | 'GET' | 'PUT' | 'DELETE' = 'POST',
    data?: T
  ) => {
    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : null,
      });
  
      // If the response isn't ok, throw an error
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.msg || 'Something went wrong');
      }
  
      return await response.json();
    } catch (error) {
        console.log(error)

      throw new Error( 'An error occurred');
    }
  };
  