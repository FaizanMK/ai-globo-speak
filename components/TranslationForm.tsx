"use client";

import { TranslationLanguages } from "@/app/translate/page";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";
import translate from "@/actions/translate";
import { useFormState } from "react-dom";
import Image from "next/image";

const initialState = {
  inputLanguage: "auto",
  input: "",
  outputLanguage: "es",
  output: "",
};
export type State = typeof initialState;

const TranslationForm = ({
  languages,
}: {
  languages: TranslationLanguages;
}) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [state, formAction] = useFormState(translate, initialState);

  const submitBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (state.output) {
      setOutput(state.output);
    }
  }, [state]);

  useEffect(() => {
    // if there is no input don't do anything, we are trimming so if there is space or enter still it doesn't do anything
    if (!input?.trim()) return;

    const delayDebounceFn = setTimeout(() => {
      // submit the form, after 500 ms
      submitBtnRef.current?.click();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [input]);

  return (
    <div>
      <div className="flex space-x-2">
        <div className="flex items-center group cursor-pointer border rounded-md w-fit px-3 py-2 bg-[#E7F0FE] mb-5">
          <Image
            src="https://links.papareact.com/r9c"
            alt="logo"
            width={30}
            height={30}
          />
          <p className="text-sm font-medium text-blue-500 group-hover:underline ml-2 mt-1">
            text
          </p>
        </div>
        {/* Recorder */}
      </div>

      <form action={formAction}>
        <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
          <div className="flex-1 space-y-2">
            <Select name="inputLanguage" defaultValue="auto">
              <SelectTrigger className="w-[280px] border-none text-blue-500 font-bold">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Want us to figure it out?</SelectLabel>

                  <SelectItem key="auto" value="auto">
                    Auto-Detection
                  </SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Languages</SelectLabel>
                  {Object.entries(languages.translation).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Textarea
              placeholder="Type ypur message here"
              className="min-h-32 text-xl"
              name="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="flex-1 space-y-2">
            <Select name="outputLanguage" defaultValue="es">
              <SelectTrigger className="w-[280px] border-none text-blue-500 font-bold">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Want us to figure it out?</SelectLabel>

                  <SelectItem key="auto" value="auto">
                    Auto-Detection
                  </SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Languages</SelectLabel>
                  {Object.entries(languages.translation).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Textarea
              placeholder="Type ypur message here"
              className="min-h-32 text-xl"
              name="output"
              value={output}
              onChange={(e) => setOutput(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button type="submit" ref={submitBtnRef}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TranslationForm;
