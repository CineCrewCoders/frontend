FROM oven/bun:1 as development

WORKDIR /usr/src/app

COPY ./frontend/package.json ./frontend/bun.lockb ./
RUN bun install --frozen-lockfile

COPY ./frontend .

RUN bunx --bun vite build

RUN bun install -g serve

EXPOSE 5173

CMD ["bun", "serve", "-s", "dist", "-l", "5173"]
