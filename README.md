# yct_api

- # Using Prisma :
  In the utils/prisma file, there are prisma utility functions that help manipulate data just like using the connecting agent, prisma, itself. In the file, there are the functions below:
  create,
  find_by_id,
  get_all,
  find_all_by_id,
  find_all_by_keys,
  find_all_by_key,
  update_by_id,
  delete_by_id,
  find_by_key,
  update_by_key, and
  delete_by_key

. Calling this functions make the whole process easy as intellisene is imlemented when they were build. The rule for calling a function is adding empty brackets inside the function when calling it. Then hit ctrl + space for intellisense. Each function always return some data depending on the type of operation performed. For example:

create({ model_name, data }) returns a single as a single data was involved.

Also don't forget to await the response if you're using the returned data.

- # Snippets

# Using res_msg

This function is responsible for performing the function of res.json() . It recieves some arguments. You can enter brackets immediately after caliing the function to get intellisene after hitting ctrl + space.
