import React , { useState} from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import {connect} from 'react-redux';
import { postArticleAPI } from '../actions';
import { serverTimestamp } from 'firebase/firestore';

const PostModal = (props) => {
    const [editorText, setEditorText] = useState ("");
    const [shareImage, setShareImage] = useState ("");
    const [videoLink, setVideoLink] = useState("");
    const [assetArea, setAssetArea] = useState("");

    const handleChange = (e) => {
        const image = e.target.files[0];

        if(image === '' || image===undefined){
            alert(`this image is not a ${typeof image}`);
            return;
        }
        setShareImage(image);
    };
    
    const switchAssetArea = (area) => {
        setShareImage("");
        setVideoLink("");
        setAssetArea(area);
    };

    const postArticle = (e) => {
        e.preventDefault();
        if(e.target !== e.currentTarget){
            return;
        }

        const payload = {
            image: shareImage,
            video: videoLink,
            user: props.user,
            description: editorText,
            timestamp: serverTimestamp(),
        };
        props.postArticle(payload);
        reset(e);

    };

    const reset = (e) => {
        setEditorText("");
        setShareImage("");
        setVideoLink("");
        setAssetArea("");
        props.handleClick(e);
    };

    

  return (
    <>
    { props.showModal === 'open' &&
        <Container>
            <Content>
                <Header>
                    <h2>Create a post</h2>
                    <button onClick={(e) => reset(e)}>
                        <img src='/images/close-icon.svg' height={'30px'} width={'30px'} alt=''/>
                    </button>
                </Header>
                <PostContent>
                    <UserInfo>
                        {props.user.photoURL ? (<img src={props.user.photoURL}/>) : (<img src='/images/user.svg' alt=''/>)}
                        <span>{props.user.displayName}</span>
                    </UserInfo>
                    <Editor>
                        <textarea 
                            value={editorText}  
                            onChange={(e) => setEditorText(e.target.value)}
                            placeholder="What do you wanna talk about?"
                            autoFocus={true}/>
                         {assetArea === 'image' ?(
                            <UploadImage>
                                <input 
                                type= "file"
                                accept='image/gif , image/jpeg, image/png' 
                                name="image" 
                                id='file'
                                style={{display: "none"}}
                                onChange={handleChange}/>
                                <p>
                                    <label htmlFor='file'> Select an image </label>
                                </p>
                                {shareImage && <img src={URL.createObjectURL(shareImage)}/>}
                            </UploadImage>)
                        :(
                        assetArea === 'media' &&(
                            <>
                                <input 
                                type='text'
                                placeholder='Plase insert a video link'
                                value={videoLink}
                                onChange={(e) => setVideoLink(e.target.value)}
                                style={{outline: 'none', border: 'none'}}
                                />
                                {videoLink && (<ReactPlayer width={'100%'} url={videoLink}/>)}
                            </>)
                        )}
                    </Editor>
                </PostContent>
                <PublishPost>
                    <AttachAssets>
                        <Assetbutton onClick={() => switchAssetArea("image")}>
                            <img src='/images/photo-icon.svg' height={'24px'} width={'24px'} alt=''/> 
                        </Assetbutton>
                        <Assetbutton onClick={() => switchAssetArea("media")}>
                            <img src='/images/video-icon.svg' height={'24px'} width={'24px'} alt=''/>
                        </Assetbutton>
                    </AttachAssets>

                    <ShareComment>
                        <Assetbutton>
                            <img src='/images/comment-button.svg' height={'24px'} width={'24px'} alt=''/> Anyone  
                        </Assetbutton>
                    </ShareComment>

                    <Postbutton disabled={!editorText ? true : false} 
                                onClick={(e) => postArticle(e)}>
                        Post
                    </Postbutton>
                </PublishPost>
            </Content> 
        </Container>
    }
    </>
  )
}

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    color: black;
    background-color: rgba(0,0,0,0.8);
    animation: fadeIn 0.3s;
`;
const Content = styled.div`
    width: 100%;
    max-width: 552px;
    background-color: white;
    max-height: 90%;
    overflow: initial;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top: 32px;
    margin: 0 auto;
`;


const Header = styled.div`
    display: block;
    padding: 16px 2px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 18px;
    line-height: 1.5;
    color: #0a66c2;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items:center;
        button{
        height: 40px;
        width: 40px;
        margin-right: 14px;
        min-width: auto;
        background-color: transparent;
        border: none;
        color: rgba(0, 0, 0, 0.15);
        svg, img{
            pointer-events: none;
            color: rgba(0, 0, 0, 0.8);
         } 
        }
        h2{
            margin-left: 10px;
        }
`;

const PostContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    vertical-align: baseline;
    background: transparent;
    padding: 8px 12px;

`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 24px;
    svg,img {
        width: 48px;
        height: 48px;
        background-clip: content-box;
        border: 2px solid transparent;
        border-radius: 50%;
    }
    span{
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-left: 5px;
    }
`;

const PublishPost = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 24px 12px 16px;
`;

const Assetbutton = styled.button`
    display: flex;
    align-items: center;
    height: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.5);
    background-color: transparent;
    border: none;
`;

const AttachAssets = styled.div`
    align-items: center;
    display: flex;
    padding-right: 8px;
    ${Assetbutton} {
        width: 40px;
    }
`;

const ShareComment = styled.div`
    padding-left: 8px;
    margin-right: auto;
    border-left: 1px solid rgba(0, 0, 0, 0.28);
    ${Assetbutton} {
        svg{
            margin-right: 10px;
        }
    }
`;

const Postbutton = styled.button`
    min-width: 60px;
    border-radius: 20px;
    padding-left: 16px;
    padding-right: 16px;
    background-color: ${(props) => (props.disabled ? "rgba(0, 0, 0, 0.8)" : "#0a66c2")} ;
    color: white;
    border: none;
    &:hover{
        background-color: ${(props) => (props.disabled ? "rgba(0, 0, 0, 0.8)" : "#004182")} ;
    }
`;

const Editor = styled.div`
    padding: 12px 24px;
    textarea{
        width: 100%;
        min-height: 100px;
        resize: none;
    }
    input{
        width: 100%;
        height: 35px;
        font-size: 16px;
        margin-bottom: 20px;
    }
`;

const UploadImage = styled.div`
    text-align: left;
    img{
        width: 100%;

    }
`;

const mapStateToProps = (state) => {
    return{
      user: state.userState.user,
    };
  };
  
  const mapDispatchToProps = (dispatch) => ({
    postArticle: (payload) => dispatch(postArticleAPI(payload)),
  });


export default connect(mapStateToProps, mapDispatchToProps)(PostModal)