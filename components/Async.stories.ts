import type { Meta, StoryObj } from "@storybook/react";
import Async from "./Async";

const meta: Meta<typeof Async> = {
    title: "Async",
    component: Async,
}

export default meta

type Stories = StoryObj<typeof Async>

export const Loading: Stories = {
    args:{
        isLoading: true,
        isError: false,
        onSuccess: null
    }
} 

export const Error: Stories = {
    args:{
        isLoading: false,
        isError: true,
        onSuccess: null
    }
}

export const Sucess: Stories = {
    args: {
        isLoading: false,
        isError: false,
        onSuccess: "success"
    }
}