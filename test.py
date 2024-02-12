import random
from collections import OrderedDict

# 질문 리스트
questions = [
    
    ## resume
    # "프로젝트 리더를 담당하면서 있었던 고민사항은 없었나요? 있다면 어떻게 해결하였나요? or 프로젝트를 진행하면서 어려움을 겪었을 때, 어떻게 해결하셨나요? 그 과정에서 어떤 것을 배우셨나요?",
    # "원활한 일정관리를 위해 어떤걸 고려하였나요?",
    # "어떤 점에서 가독성이 더 증가하였나요?",
    # "좋은 가독성이란 무엇일까요?",
    # "비용이라 함은 어떤 기준이었나요? 무엇이 근거였나요?",
    # "대체로 고려할 기술은 무엇이었나요?",
    # "80점에서 성능을 더 향상시킬 방법은 무엇이 있었나요? 그리고 왜 그걸 하지 않았나요?"

    ## React
    "Recoil을 선택한 이유가 무엇인가요?",
    "메모이제이션은 무엇이고 리액트에서 어떤 방식으로 활용할 수 있나요?",
    "useCallback 과 useMemo는 왜 사용합니까?",
    "React Hooks에 대해 설명해주세요.",
    "useEffect는 왜 사용합니까?",
]


# 질문 리스트를 무작위로 섞음
random.shuffle(questions)

# 답변을 저장할 OrderedDict
answers = OrderedDict()

# 섞인 질문 리스트를 순회하면서 질문을 출력하고 사용자의 입력을 받음
for question in questions:
    answer = input(question + "\n답변: ")
    answers[question] = answer

# 모든 답변을 한꺼번에 출력
for question in questions:
    print("{}\n당신의 답변은 '{}'입니다.\n".format(question, answers[question]))
