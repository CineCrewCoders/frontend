# Use the official Bun image
FROM oven/bun:1 as development

# Set the working directory in the container
WORKDIR /usr/src/app

# Install dependencies
# Copying only package.json and bun.lockb initially to leverage Docker cache
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Copy the entire project (except what's excluded in .dockerignore)
COPY . .

# Expose the port used by Vite
EXPOSE 5173

# Command to run the Vite development server
CMD ["bun", "run", "vite", "--", "--host"]
