import { KeyReturn } from "phosphor-react";
import { Container } from "../../components/Container";
import { FormEvent } from "react";
import { LikeButton } from "../../components/LikeButton";
import { CategoryChips } from "../../components/CategoryChips";
import { UserLink } from "../../components/UserLink";
import { Comment } from "./components/Comment";

export function Post() {
  function autoResizeTextArea(ev: FormEvent) {
    const ta = ev.target as HTMLTextAreaElement;
    ta.style.height = "0";
    ta.style.height = `${ta.scrollHeight}px`;
  }

  return <Container>
    <div className="flex flex-row justify-between items-center self-stretch">
      <div className="flex flex-col items-start gap-1">
        <div className="flex flex-row gap-2 items-center">
          <UserLink>Nícolas Carvalho</UserLink>
          <span className="font-light">em</span>

          <CategoryChips
            name="Brasil"
            color="#6d8c003f"
          ></CategoryChips>
          <CategoryChips
            name="Humor"
            color="#c23c0c3f"
          ></CategoryChips>
        </div>
        <h1 className="font-bold text-3.5xl leading-tight">Título</h1>
      </div>

      <LikeButton count={24} orientation="horizontal" state="upvote">
      </LikeButton>
    </div>

    <div className="flex flex-col items-start gap-2 self-stretch text-base leading-5 tracking-wider">
      <p className="text-justify font-roboto">
        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
        Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.
        Maecenas vitae mattis tellus. Nullam quis imperdiet augue.
        Vestibulum auctor ornare leo, non suscipit magna interdum eu.
        Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet.
        Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat.
        In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem orci, mattis non efficitur id, ultricies vel nibh.
        Sed volutpat lacus vitae gravida viverra. Fusce vel tempor elit. Proin tempus,.
      </p>

      <div className="flex flex-row gap-2 text-silver-chalice-400">
        <span>12:43</span>
        <span>•</span>
        <span>11 de dezembro de 2023</span>
        {/* tags */}
      </div>
    </div>

    <div className="flex flex-col items-start gap-8 self-stretch">
      <div className="flex flex-col gap-4 self-stretch items-start">
        <div className="flex flex-row items-start gap-2 pb-2 self-stretch border-b-2 border-solid border-silver-chalice-400">
          <h2 className="font-bold text-2xl tracking-wider leading-normal">Comentários</h2>
        </div>

        <div className="flex flex-row pr-4 pl-1 min-h-[1.5rem] gap-4 content-between items-center self-stretch">
          <textarea
            className="flex-grow flex-shrink-0 font-roboto text-base tracking-wider leading-normal pt-1 resize-none placeholder-silver-chalice-400"
            placeholder="Adicionar Um comentário"
            onInput={autoResizeTextArea}
            rows={1}
          >
          </textarea>

          <span className="text-shark-950 cursor-pointer"><KeyReturn size={32}></KeyReturn></span>
        </div>
      </div>

      <Comment
        user={{
          name: "José Roberto de Vasconcelos"
        }}
        content="É muito é maça"
        timestamp={new Date}
      ></Comment>
    </div>
  </Container>
}