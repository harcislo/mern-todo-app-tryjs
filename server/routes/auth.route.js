const {Router} = require('express')
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')


const router = Router()

router.post('/registration', [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Пароль должен быть длиннее 5 и короче 20 символов').isLength({min: 5, max: 20}),

    ],
    async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные регистрационные данные'
            })
        }

        try {
            const {email, password} = req.body

            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: 'Пользователь с такой почтой уже зарегистрирован'})
            }

            const hashedPassword = await bcrypt.hash(password, 5)

            const user = new User({
                email, password: hashedPassword
            })

            await user.save()
            return res.status(200).json({massage: 'Пользователь создан'})


        } catch (e) {
            res.status(400).json({message: 'Ошибка регистрации'})
            console.log(e)
        }
    })

router.post('/login', [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Некорректный пароль').exists()
], async (req, res) => {

    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные авторизационные данные'

            })
        }

        const {email, password} = req.body

        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({message: 'Пользователя c такой почтой не существует'})
        }

        const isMatch = bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(400).json({message: 'Неверный пароль'})
        }

        const secretKey = config.get('secretKey')

        const token = jwt.sign(
            {userId: user._id},
            secretKey,
            {expiresIn: '1h'}
        )

        return res.status(200).json({token, userId: user._id, message:'Пользователь авторизован'})




    } catch (e) {
        res.status(400).json({message: 'Ошибка авторизации'})
        console.log(e)
    }

})

module.exports = router