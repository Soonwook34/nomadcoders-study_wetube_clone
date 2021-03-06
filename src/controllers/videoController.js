import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

// Home
export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({ _id: -1 });
        res.render("home", { pageTitle: "Home", videos });
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videos: [] });
    }
};

// Search Video
export const search = async (req, res) => {
    // searchingBy = req.query.term과 같은 코드
    const { query: { term: searchingBy } } = req;
    let videos = [];
    try {
        // regular expression(정규표현식)으로 find, case-insensitive
        videos = await Video.find({ title: { $regex: searchingBy, $options: "i" } });
    } catch (error) {
        console.log(error);
    }
    res.render("search", { pageTitle: "Search", searchingBy, videos });
};

// Upload Video
export const getUpload = (req, res) =>
    res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
    const {
        body: { title, description },
        file: { location }
    } = req;
    const newVideo = await Video.create({
        fileUrl: location,
        title,
        description,
        creator: req.user.id
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo.id));
};

// Video Detail
export const videoDetail = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        // creator, comments의 id로 데이터 추가로 불러오기(populate)
        const video = await Video.findById(id)
            .populate("creator")
            .populate("comments");
        res.render("videoDetail", { pageTitle: video.title, video });
    } catch (error) {
        res.redirect(routes.home);
    }
};

// Edit Video
export const getEditVideo = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id);
        if (video.creator != req.user.id) {
            throw Error();
        } else {
            res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
        }
    } catch (error) {
        res.redirect(routes.home);
    }
};
export const postEditVideo = async (req, res) => {
    const {
        params: { id },
        body: { title, description }
    } = req;
    try {
        await Video.findOneAndUpdate({ _id: id }, { title, description });
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        res.redirect(routes.home);
    }
};

// Delete Video
export const deleteVideo = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id);
        if (video.creator != req.user.id) {
            throw Error();
        } else {
            await Video.findOneAndRemove({ _id: id });
        }
    } catch (error) {
        console.log(error);
    }
    res.redirect(routes.home);
  };

// Register Video View (조회수 1 증가)

export const postRegisterView = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id);
        video.views += 1;
        video.save();
        res.status(200);
    } catch (error) {
        // 에러
        res.status(400);
    } finally {
        // 종료
        res.end();
    }
};


// Add Comment

export const postAddComment = async (req, res) => {
    const {
        params: { id },
        body: { comment },
        user
    } = req;
    try {
        const video = await Video.findById(id);
        const newComment = await Comment.create({
            text: comment,
            creator: user.id
        });
        video.comments.push(newComment.id);
        video.save();
    } catch (error) {
        res.status(400);
    } finally {
        res.end();
    }
};

// Delete Comment

export const postDeleteComment = async (req, res) => {
    const {
        params: { id },
        body: { commentIdx },
    } = req;
    try {
        const video = await Video.findById(id);
        const indexOnDB = video.comments.length - commentIdx - 1;
        const commentID = video.comments[indexOnDB];
        await Video.findByIdAndUpdate(
            id,
            { $pull: { comments: commentID } },
            { safe: true, upsert: true }
        );
        await Comment.findOneAndRemove({ _id: commentID });
    } catch (error) {
        res.status(400);
    } finally {
        res.end();
    }
};