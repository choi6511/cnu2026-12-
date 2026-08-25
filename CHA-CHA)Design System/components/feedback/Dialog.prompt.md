Centered modal for confirmations and short forms. Add `mascotSrc` for celebratory or apologetic moments.

```jsx
<Dialog title="에셋을 다운로드할까요?" description="PNG 4종이 zip으로 저장됩니다." mascotSrc="../../assets/face-joy.png"
  onClose={close} footer={<><Button variant="ghost" onClick={close}>취소</Button><Button>다운로드</Button></>} />
```
