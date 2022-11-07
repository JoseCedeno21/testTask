exports.testPublicFunction = (req, res) => {
    try {
        return res.status(200).json({ message: 'success' })
    } catch (error) {
        console.log('public function error', error)
        return res.status(500).json({ message: 'function error' })
    }
}

exports.testPrivateFunction = (req, res) => {
    try {
        return res.status(200).json({ message: 'success' })
    } catch (error) {
        console.log('private function error', error)
        return res.status(500).json({ message: 'function error' })
    }
}