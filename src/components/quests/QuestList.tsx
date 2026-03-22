import { AnimatePresence, motion } from "framer-motion";
import QuestCard from "./QuestCard";


const QuestList = ({ quests, onComplete }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <AnimatePresence mode="popLayout">
      {quests.map((quest) => (
        <motion.div
          key={quest.questid}
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.25 }}
        >
          <QuestCard quest={quest} onComplete={onComplete} />
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

export default QuestList;
